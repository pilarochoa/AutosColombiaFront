import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { CellStatuses as CellStatusesComponent } from "../../components/CellStatus/CellStatuses";
import AppContext from "../../context/AppContext";
import { CellStatusService } from "../../services/cellStatus";
import { ICellStatus } from "../../interfaces/cellStatus";

export const CellStatuses = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ICellStatus[]>([]);
  
  const getAllCellStatuses = async () => {
    try {
      const cellStatuses: ICellStatus[] | undefined = await CellStatusService.getAllCellStatuses(setIsLogin);
      console.log('cellStatuses == ', cellStatuses);
      if (cellStatuses && cellStatuses.length > 0) {
        const resultData: ICellStatus[] = cellStatuses.map((item: ICellStatus) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllCellStatuses = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('stateCell');
    };
    setLoading(true);
    getAllCellStatuses();
  }, []);

  const deleteCellStatus = async (id: string) => {
    setLoading(true);
    try {
      const user: ICellStatus | undefined = await CellStatusService.deleteCellStatus(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: ICellStatus) => item._id !== id);
        setDataSource(newData);
        message.success('El registro ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteCellStatus = ",  error);
    }
  };

  return (
    <CellStatusesComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteCellStatus}
    />
  );
};