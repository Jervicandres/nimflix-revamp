interface IProps {
   date: Date
}
export const FormatDate = ({date}: IProps) => {
   const formatter:any = new Intl.RelativeTimeFormat('en');
   const timeDiff: any = new Date().getTime() as number - date.getTime();
   const relativeTimeFormat = formatter.format();
}