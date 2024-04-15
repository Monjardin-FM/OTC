import { DefendantById } from '../entities/defendant-by-id';
import { Defendant } from '../entities/defendant';

export type DefendantRepository = {
  getDefendant(params: { completeName: string }): Promise<Defendant[]>;
  getDefendantById(params: {
    completeName: string;
    idPerson: number;
  }): Promise<DefendantById>;
  createDefendant(params: {
    completeName: string;
    name: string;
    lastName: string;
    idCounty: number;
    idOfficer: number;
    eMail: string;
    sid: string;
    offense: string;
    caseNumber: string;
    birthDate: string;
    idGender: number;
    idStatus: number;
    password: string;
  }): Promise<void>;
  updateDefendant(params: {
    idPerson: number;
    completeName: string;
    name: string;
    lastName: string;
    idCounty: number;
    idOfficer: number;
    sid: string;
    offense: string;
    caseNumber: string;
    birthDate: string;
    idGender: number;
    idStatus: number;
    password: string;
  }): Promise<void>;
  deleteDefendant(parms: { idPerson: number }): Promise<Boolean>;
};
