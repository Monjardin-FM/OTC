import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import { AppHero } from 'presentation/components/AppHero';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
export type AppManagemenetUsersHeaderProps = {
  onClick: (search: string) => void;
  loadingUsers: boolean;
  search: string;
  setSearch: (search: string) => void;
};
export const AppManagemenetUsersHeader = ({
  loadingUsers,
  onClick,
  search,
  setSearch,
}: AppManagemenetUsersHeaderProps) => {
  return (
    <AppHero
      size="base"
      style={{
        background: 'linear-gradient(to right, #133a94, #919bff)',
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          Users Management
        </h1>
        <div className="w-2/3 flex flex-row items-center bg-white rounded-lg ">
          <AppTextField
            placeholder="Name,  email"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></AppTextField>
          <AppButton
            variant="ghost"
            isLoading={loadingUsers}
            onClick={() => {
              onClick(search);
            }}
          >
            <Icon.Search />
          </AppButton>
        </div>
      </div>
    </AppHero>
  );
};
