import { api } from '@/utils/index';
import type { BlogCreateInput } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateBlog = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: BlogCreateInput) => {
      const { id, ...rest } = values;
      if (id) {
        return api.put(`blog/${id}`, {
          body: JSON.stringify(rest),
        });
      }
      return api
        .post('blog', {
          body: JSON.stringify(rest),
        })
        .json();
    },
    onSuccess: () => client.invalidateQueries(['blogs']),
  });
};
const useDeleteBlog = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`blog/${id}`);
    },
    onSuccess: () => client.invalidateQueries(['blogs']),
  });
};

export { useCreateBlog, useDeleteBlog };
