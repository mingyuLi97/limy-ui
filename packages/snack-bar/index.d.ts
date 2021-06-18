export interface IOptions {
    content: string;
    btnText: string;
    icon: string;
    duration?: number;
    transitionDuration?: number;
    commentBarHeight: number;
    onClickButton?: () => void;
    onClose?: () => void;
}
declare module 'vue/types/vue' {
    interface Vue {
        $SnackBar: typeof SnackBarShow;
    }
}
export declare const SnackBarShow: (options: IOptions) => void;
declare const _default: {
    install: () => void;
};
export default _default;
