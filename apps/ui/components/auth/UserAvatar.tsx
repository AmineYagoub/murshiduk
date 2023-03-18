import config from '@/config/App';
import ImgCrop from 'antd-img-crop';
import { User } from '@/utils/types';
import { LoadingOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useAuthState } from '@/hooks/auth/mutation.hook';
import { useUploadAvatar } from '@/hooks/auth/avatar.hook';
import { Image, message, notification, Upload } from 'antd';

const { UPLOAD_EXT_MIME, avatarUrl, UPLOAD_SIZE } = config.UPLOAD;

const UPLOAD_FIELD_NAME = 'personalImage';

const bytes = UPLOAD_SIZE * 1024 * 1024;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('يمكنك فقط رفع صور بصيغة JPG/PNG !');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('حجم الصورة لا ينبغي أن يتجاوز 2MB !');
  }
  return isJpgOrPng && isLt2M;
};
const beforeCrop = (
  file: File,
  fileList: File[]
): boolean | Promise<boolean> => {
  const { type, name, size } = file;
  if (size > bytes) {
    notification.error({
      message: `تجاوز الحجم المسموح`,
      description: `صورتك الشخصية يجب أن لا يتعدى حجمها (${UPLOAD_SIZE}MB) `,
    });
    return false;
  }
  if (!UPLOAD_EXT_MIME.includes(type)) {
    notification.error({
      message: `إمتداد غير مسموح`,
      description: `إمتداد الملف ${name} غير مسموح به.`,
    });
    return false;
  }
  return true;
};

const UserAvatar = () => {
  const { onUploadChange, loading } = useUploadAvatar();
  const [user] = useAuthState<User>();
  const uploadInProgress = (
    <div>
      <LoadingOutlined />
      <div style={{ marginTop: 8 }}>جاري رفع الصورة ...</div>
    </div>
  );
  return (
    <ImgCrop modalTitle="ضبط الصورة الشخصية" beforeCrop={beforeCrop}>
      <Upload
        name={UPLOAD_FIELD_NAME}
        accept={UPLOAD_EXT_MIME.join()}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        action={avatarUrl(user.id)}
        onChange={(info) => onUploadChange(info, UPLOAD_FIELD_NAME)}
      >
        {loading[UPLOAD_FIELD_NAME] ? (
          uploadInProgress
        ) : (
          <Image
            src={user.profile.avatar}
            alt="avatar"
            className="avatar-uploader"
            preview={false}
            width="100%"
          />
        )}
      </Upload>
    </ImgCrop>
  );
};

export default UserAvatar;
