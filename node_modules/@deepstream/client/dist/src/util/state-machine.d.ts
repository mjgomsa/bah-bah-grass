export declare class StateMachine {
    private stateMachine;
    state: any;
    inEndState: boolean;
    private transitions;
    private context;
    private history;
    constructor(logger: any, stateMachine: any);
    /**
     * Try to perform a state change
     */
    transition(transitionName: any): void;
}
