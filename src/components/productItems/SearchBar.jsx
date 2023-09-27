import { TextInput } from "@mantine/core";
export function SearchBar({ value, setValue, onEnter }) {
  return (
    <TextInput
      label="Search product:"
      placeholder="Enter your search query"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => onEnter(e)}
    />
  );
}
