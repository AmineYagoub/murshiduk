import { useState } from 'react';
import { Logger } from '@/utils/Logger';
import { useAuthState } from './mutation.hook';
import { User } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/index';

type FileProps = {
  url: string;
  id: string;
};

type FilesList = {
  avatar: FileProps;
};

const useUpdateAvatar = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      avatar,
    }: {
      id: string;
      avatar: string;
    }): Promise<User> => {
      return api
        .put(`auth/${id}/avatar`, {
          body: JSON.stringify({ avatar }),
        })
        .json();
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['user'] }),
  });
};

export const useUploadAvatar = () => {
  const { mutateAsync } = useUpdateAvatar();
  const [user, setUser] = useAuthState<User>();
  const [docsList, setDocsList] = useState<FilesList>({
    avatar: { id: user.id, url: user.profile.avatar },
  });
  const [loading, setLoading] = useState({
    avatar: false,
  });

  const onUploadChange = async ({ fileList: newFileList }, name: string) => {
    setLoading({
      ...loading,
      [name]: true,
    });

    if (newFileList[0]?.response) {
      const res = newFileList[0]?.response;
      setDocsList({
        ...docsList,
        [res.docName]: {
          url: res.message,
          id: user.id,
        },
      });
      try {
        await mutateAsync({ id: user.id, avatar: res.message });
        user.profile.avatar = res.message;
        setUser(user);
      } catch (error) {
        Logger.log(error);
      } finally {
        setLoading({
          ...loading,
          [name]: false,
        });
      }
    }
  };

  return {
    onUploadChange,
    docsList,
    loading,
  };
};
