import { useEffect, useState } from 'react';

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

interface UseGitHubRepoResult {
  data: GitHubRepo | null;
  loading: boolean;
  error: boolean;
}

const cache = new Map<string, GitHubRepo>();

export function useGitHubRepo(owner: string, repo: string): UseGitHubRepoResult {
  const [data, setData] = useState<GitHubRepo | null>(cache.get(`${owner}/${repo}`) ?? null);
  const [loading, setLoading] = useState(!cache.has(`${owner}/${repo}`));
  const [error, setError] = useState(false);

  useEffect(() => {
    const key = `${owner}/${repo}`;
    if (cache.has(key)) {
      setData(cache.get(key)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json() as Promise<GitHubRepo>;
      })
      .then((json) => {
        if (cancelled) return;
        cache.set(key, json);
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [owner, repo]);

  return { data, loading, error };
}
