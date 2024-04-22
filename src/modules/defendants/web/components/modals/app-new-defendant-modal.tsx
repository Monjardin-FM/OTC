import React, { useEffect, useState } from 'react';
import {
  AppModal,
  AppModalBody,
  AppModalContent,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';

import { DefendantForm } from '../forms/defendant-form';
import { VictimForm } from '../forms/victim-form';
import { AlarmForm } from '../forms/alarm-form';
import { ReferenceForm } from '../forms/reference-from';
import { AppBadge } from 'presentation/components/AppBadge';
import { useCreateDefendant } from '../../hooks/use-create-defendant';
import { createDefendantParams } from 'modules/defendants/domain/repositories/defendant-repository';
import { Tab } from '@headlessui/react';
import { useGetDefendantsById } from '../../hooks/use-get-defendants-by-id';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
export type AppNewDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const AppNewDefendantModal = ({
  isVisible,
  onClose,
}: AppNewDefendantModalProps) => {
  const { createDefendant, value } = useCreateDefendant();
  const [isCreatedDefendant, setIsCreatedDefendant] = useState(false);
  const [idDefendant, setIdDefendant] = useState<number>();
  const { getDefendantById, defendant } = useGetDefendantsById();

  const onCreateDefendant = async (params: createDefendantParams) => {
    const id = await createDefendant(params);
    setIsCreatedDefendant(true);
    if (id) setIdDefendant(id);
    console.log(params);
    console.log(id);
  };

  useEffect(() => {
    // console.log(createDefendant);
    setIdDefendant(value);
    console.log(value);
  }, [value]);
  useEffect(() => {
    if (idDefendant) getDefendantById({ idPerson: idDefendant });
  }, [idDefendant]);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="full">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>
            <div className="flex flex-row items-center justify-evenly gap-5 ">
              <span>New Defendant</span>
              <span>
                <AppBadge colorScheme="warn">
                  Defendant Name:{' '}
                  {defendant
                    ? `${defendant?.name} ${defendant?.lastName} `
                    : ''}
                </AppBadge>
              </span>
              <span>
                <AppBadge colorScheme="warn">SID: {defendant?.sid}</AppBadge>
              </span>
            </div>
          </AppModalHeader>
          <AppModalBody>
            <div className="w-full px-2 py-16">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl border border-primary-100 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-info-500 text-white shadow'
                          : 'text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150',
                      )
                    }
                  >
                    Defendant
                  </Tab>
                  <Tab
                    disabled={!isCreatedDefendant}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-info-500 text-white shadow'
                          : 'text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150',
                      )
                    }
                  >
                    Victims
                  </Tab>
                  <Tab
                    disabled={!isCreatedDefendant}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-info-500 text-white shadow'
                          : 'text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150',
                      )
                    }
                  >
                    Alarms
                  </Tab>
                  <Tab
                    disabled={!isCreatedDefendant}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-offset-2 ring-offset-info-100 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-info-500 text-white shadow'
                          : 'text-info-600 hover:bg-white hover:text-info-600 transition-all duration-150',
                      )
                    }
                  >
                    Reference Contacts
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <DefendantForm
                      onCreateDefendant={onCreateDefendant}
                      onClose={onClose}
                      isCreatedDefendant={isCreatedDefendant}
                      idDefendant={idDefendant}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <VictimForm />
                  </Tab.Panel>
                  <Tab.Panel>
                    <AlarmForm />
                  </Tab.Panel>
                  <Tab.Panel>
                    <ReferenceForm />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </AppModalBody>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
