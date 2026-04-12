import { InfoIcon } from '@phosphor-icons/react/dist/ssr';

export function Banner() {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b-[0.5px] border-b-[#fac775] bg-[#faeeda] px-3.5 py-1.5 text-[11px] text-[#633806]">
      <InfoIcon size={12} color="#BA7517" />
      Maintenance mode — a new version is in the works. Stay tuned!
      <button className="ml-auto cursor-pointer text-[11px] font-medium text-[#854f0b]">
        Dismiss
      </button>
    </div>
  );
}
