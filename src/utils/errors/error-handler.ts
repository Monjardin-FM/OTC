import { ErrorEntry } from 'utils/errors/types/error.entry';
import { SweetAlertIcon } from 'sweetalert2';
import { LangData } from 'utils/errors/languages/es/errors.lang';
import { AppToast } from 'presentation/components/AppToast';
import { AppSwal } from 'presentation/components/AppSwal';
import { BaseException } from 'application/exceptions/base.exception';

export const useErrorHandler = (lang: string) => {
  const handleError = (key: string | Error) => {
    const data: any = LangData;
    const parsedKey =
      key instanceof Error
        ? key instanceof BaseException
          ? key.code
          : 'error.internal'
        : key;

    const entry: ErrorEntry = data[parsedKey];
    if (entry) {
      const provider: any = entry.type === 'dialog' ? AppSwal() : AppToast();
      provider.fire({
        icon: entry.icon as SweetAlertIcon,
        title: entry.title,
        text: entry.description ?? '',
      });
      return;
    }
    throw new Error('Uninplemented required key');
  };

  return {
    handleError,
  };
};
