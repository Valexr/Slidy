export type State = 'play' | 'pause' | 'stop';

export interface Props {
    disabled: boolean;
    state: State;

    onClick: () => void;
}