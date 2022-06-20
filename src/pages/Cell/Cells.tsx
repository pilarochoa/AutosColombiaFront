import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { Cells as CellsComponent } from "../../components/Cell/Cells";
import AppContext from "../../context/AppContext";
import { ICell } from "../../interfaces/cell";
import { CellService } from "../../services/cell";

export const Cells = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ICell[]>([]);

  const getAllCells = async () => {
    try {
      const cells: ICell[] | undefined = await CellService.getAllCells(setIsLogin);
      if (cells && cells.length > 0) {
        const resultData: ICell[] = cells.map((item: ICell) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllCells = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('cell');
    };
    setLoading(true);
    getAllCells();
  }, []);

  const deleteCell = async (id: string) => {
    setLoading(true);
    try {
      const user: ICell | undefined = await CellService.deleteCell(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: ICell) => item._id !== id);
        setDataSource(newData);
        message.success('La celda ha sido eliminada con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteCell = ",  error);
    }
  };

  return (
    <CellsComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteCell}
    />
  );
};