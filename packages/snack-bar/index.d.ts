export interface IOptions {
    content: string;
    btnText: string;
    icon: string;
    duration?: number;
    transitionDuration?: number;
    commentBarHeight: number;
    onClickButton?: () => void;
    onClose?: () => void;
    onUserClickClose?: () => void;
}
declare module 'vue/types/vue' {
    interface Vue {
        $SnackBar: {
            show: typeof show;
            close: typeof close;
        };
    }
}
declare function show(options: IOptions): void;
declare function close(): void;
declare const _default: {
    install: () => void;
    show: typeof show;
    close: typeof close;
};
export default _default;
