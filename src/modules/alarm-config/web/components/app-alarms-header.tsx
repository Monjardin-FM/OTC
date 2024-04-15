import React from 'react';
import { AppHero } from 'presentation/components/AppHero';
import * as Icon from 'react-feather';
import AppTextField from 'presentation/components/AppTextField';
import { AppButton } from 'presentation/components/AppButton';
export const AppAlarmsHeader = () => {
  return (
    <AppHero
      size="base"
      style={{
        background: 'linear-gradient(to right, #133a94, #919bff)',
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          Alarms
        </h1>
        <div className="w-2/3 flex flex-row items-center bg-white rounded-lg ">
          <AppTextField
            placeholder="Name,  email"
            type="text"
            onChange={(e) => {
              //   setSearchUser(e.target.value);
              //   setVisible(true);
            }}
            // value={searchUser}
          ></AppTextField>
          <AppButton
            variant="ghost"
            isLoading={false}
            onClick={() => {
              //   handleClick(fullNameUser);
            }}
          >
            <Icon.Search />
          </AppButton>
        </div>
      </div>
    </AppHero>
  );
};
