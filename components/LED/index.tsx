type Props = {
  on?: boolean;
  cursor: boolean;
  toggleOn: () => void;
};
export default function LED({ on = false, toggleOn, cursor }: Props) {
  const background = on ? "bg-yellow-300" : "bg-gray-800";
  return (
    <div
      className={`${
        cursor ? "cursor-pointer" : ""
      } w-3 h-3 rounded-full ${background}`}
      onClick={() => {
        if (toggleOn) {
          toggleOn();
        }
      }}
    ></div>
  );
}
