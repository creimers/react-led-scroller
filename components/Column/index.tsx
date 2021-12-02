import LED from "../LED";

type Props = {
  pattern?: boolean[];
  toggleOn?: (rowIndex: number) => void;
};

export default function Column({
  toggleOn,
  pattern = [false, false, false, false, false, false],
}: Props) {
  return (
    <div className="flex flex-col space-y-1">
      {pattern.map((on, i) => (
        <LED
          key={`led-${i}`}
          on={on}
          cursor={toggleOn !== undefined}
          toggleOn={() => {
            if (toggleOn) {
              toggleOn(i);
            }
          }}
        />
      ))}
    </div>
  );
}
