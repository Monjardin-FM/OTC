import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import { AppHero } from 'presentation/components/AppHero';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
export const AppDefendantsHeader = () => {
  return (
    <AppHero
      size="base"
      style={{
        background: 'linear-gradient(to right, #133a94, #919bff)',
      }}
    >
      <div className="container flex flex-col items-center mx-auto">
        <div className=" flex flex-col max-w-3xl w-full items-center px-4 justify-center absolute top-14">
          <h1 className="text-lg font-semibold text-white center text-opacity-90 mb-5 ">
            Defendants
          </h1>
        </div>
        <div className="w-full max-w-3xl flex flex-row  items-center bg-white rounded-lg ">
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
