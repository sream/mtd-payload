import { IconDefinition } from '@/icons'

type IconProps = {
  icon: IconDefinition
  className?: string
}

export const Icon: React.FC<IconProps> = ({ icon, className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" focusable="false" className={className}>
    {icon.paths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
)
