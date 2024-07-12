interface DropdownItemProps {
  label: string;
  color?: string;
}

export function DropdownItem({ label, color }: DropdownItemProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {color && (
        <div
          style={{ width: 10, height: 10, borderRadius: 9999, flexShrink: 0, background: color }}
        ></div>
      )}
      <div>
        <span style={{ fontSize: '0.75rem' }}>{label}</span>
      </div>
    </div>
  );
}
