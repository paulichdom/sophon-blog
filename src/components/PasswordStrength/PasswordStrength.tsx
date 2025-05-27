import { FC } from 'react';
import { Group, PasswordInput, Progress } from '@mantine/core';
import { PasswordRequirement } from '../PasswordRequirement/PasswordRequirement';
import { getStrength, requirements } from './PasswordStrength.helpers';

type PasswordStrengthProps = {
  value: string;
  setValue: (value: string) => void;
  error: React.ReactNode | null | undefined;
};

export const PasswordStrength: FC<PasswordStrengthProps> = ({ value, setValue, error }) => {
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        required
        label="Password"
        placeholder="Your password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        error={error}
      />

      <Group gap={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Has at least 6 characters" meets={value.length > 5} />
      {checks}
    </div>
  );
};
