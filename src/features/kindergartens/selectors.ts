import { RootState } from '../../app/store';
import Kindergarten from './types/Kindergarten';

export const selectKindergartens = (state: RootState): Kindergarten[] => state.kindergartens.kindergartens;
export const selectError = (state: RootState): string | undefined => state.kindergartens.error;
