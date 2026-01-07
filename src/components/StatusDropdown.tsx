'use client';

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type StatusDropdownProps = {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
};

const statusOptions = ['open', 'in_progress', 'closed'];

export default function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [selected, setSelected] = useState(currentStatus);

  const handleChange = (value: string) => {
    setSelected(value);
    onStatusChange(value);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={selected}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((status) => (
          <SelectItem key={status} value={status}>
            {status.replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
