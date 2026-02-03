import styled from "styled-components";
import { exportToCsv } from "../helper";
import { Button } from "./Button";

type CSVPrimitive = string | number | boolean | null | undefined;

type ExportCsvButtonProps<T extends object> = {
  rows: T[];
  headers: Array<keyof T>;
  filename?: string;
  label?: string;
  disabled?: boolean;
};

const Icon = styled.span`
  font-size: 16px;
  line-height: 0;
`;

function ExportCsvButton<T extends Record<string, CSVPrimitive> | object>({
  rows,
  headers,
  filename = "export.csv",
  label = "Export CSV",
  disabled,
}: ExportCsvButtonProps<T>) {
  const isDisabled = disabled ?? rows.length === 0;

  const handleClick = () => {
    if (!rows.length) return;
    exportToCsv(rows, headers, filename);
  };

  return (
    <Button variant="primary" onClick={handleClick} disabled={isDisabled}>
      <Icon>⬇️</Icon>
      {label}
    </Button>
  );
}

export default ExportCsvButton;
