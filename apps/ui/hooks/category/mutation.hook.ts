import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/index';

type CategoryCreateInput = {
  id?: string;
  title: string;
  categories?: {
    value: string;
  };
  parentId?: string;
};

const useCreateCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: CategoryCreateInput) => {
      const { id, categories, ...rest } = values;
      if (categories) {
        rest.parentId = categories.value;
      }
      if (id) {
        return api.put(`category/${id}`, {
          body: JSON.stringify(rest),
        });
      }
      return api.post('category', {
        body: JSON.stringify(rest),
      });
    },
    onSuccess: () => client.invalidateQueries(['category']),
  });
};

const useDeleteCategory = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`category/${id}`);
    },
    onSuccess: () => client.invalidateQueries(['category']),
  });
};

export { useCreateCategory, useDeleteCategory };
