import { api } from '@/utils/index';
import type { ReviewCreateInput } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateReview = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: ReviewCreateInput) => {
      return api.post('review', {
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => client.invalidateQueries(['Review']),
  });
};

const useUpdateReview = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) => {
      return api.put(`review/${id}`, {
        body: JSON.stringify({ published }),
      });
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['getReviews'] }),
  });
};

const useDeleteReview = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`review/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['getReviews'] }),
  });
};

export { useCreateReview, useDeleteReview, useUpdateReview };
