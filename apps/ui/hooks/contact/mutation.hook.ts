import { api } from '@/utils/index';
import type {
  ContactCreateInput,
  ContactNoteCreateInput,
  ContactStatus,
} from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateContact = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: ContactCreateInput) => {
      return api.post('contact', {
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => client.invalidateQueries(['contact']),
  });
};

const useCreateContactNote = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (values: ContactNoteCreateInput) => {
      const { contactId, ...rest } = values;
      return api.post(`contact/${contactId}/note`, {
        body: JSON.stringify(rest),
      });
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['getContact'] }),
  });
};

const useUpdateContact = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) => {
      return api.put(`contact/${id}`, {
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['contacts'] }),
  });
};

const useDeleteContact = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`contact/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['contacts'] }),
  });
};

const useDeleteContactNote = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`contact/note/${id}`);
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['contacts'] }),
  });
};

export {
  useCreateContact,
  useDeleteContact,
  useUpdateContact,
  useCreateContactNote,
  useDeleteContactNote,
};
