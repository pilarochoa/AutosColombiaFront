import { Button, Dropdown, FormInstance, Input } from "antd";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

interface IInputControl {
  color: string;
  form: FormInstance;
}

export const InputColor = ({ color, form }: IInputControl) => {
  const [internalColor, setInternalColor] = useState(color);

  const handleChange = (color: any) => {
    setInternalColor(color.hex);
    if (form) {
      const values = form.getFieldsValue()
      form.setFieldsValue({
        ...values,
        color: color.hex
      })
    }
  };

  useEffect(() => {
    if (color) {
      setInternalColor(color);
    }
  }, [color]);
  
  const overlay = (
    <div>
      <SketchPicker
        color={internalColor}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <>
      <Input
        value={internalColor || ""}
        onChange={(e) => setInternalColor(e.target.value)}
        suffix={
          <Dropdown trigger={["click"]} overlay={overlay}>
            <Button style={{ background: internalColor }}> </Button>
          </Dropdown>
        }
      />
    </>
  );
};
