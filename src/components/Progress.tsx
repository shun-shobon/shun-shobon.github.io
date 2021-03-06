import { h } from "preact";
import type { FunctionComponent } from "preact";

type Props = {
  completed: number;
};

const ProgressBar: FunctionComponent<Props> = ({ completed }) => {
  return (
    <div class="relative w-full">
      <div class="h-1.5 rounded bg-text">
        <div style={`width:${completed}%`} class="h-full rounded bg-primary" />
      </div>
    </div>
  );
};

const Progress: FunctionComponent<Props> = ({ completed }) => {
  return (
    <div class="flex w-full items-center">
      <ProgressBar completed={completed} />
      <span class="ml-2">{completed}%</span>
    </div>
  );
};

export default Progress;
