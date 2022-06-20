import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CellStatusForm } from "../../components/CellStatus/CellStatusForm";
import AppContext from "../../context/AppContext";
import { ICellStatus } from "../../interfaces/cellStatus";
import { CellStatusService } from "../../services/cellStatus";

export const CellStatus = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataCellStatus, setDataCellStatus] = useState<ICellStatus | undefined>(undefined);

  const navigate = useNavigate();

  const getCellStatusById = async (id: string) => {
    try {
      const user: ICellStatus | undefined = await CellStatusService.getCellStatusById(id, setIsLogin);
      if (user) {
        setDataCellStatus(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('stateCell');
    };
  }, []);

  useEffect(() => {
    if (id) {
      getCellStatusById(id);
    }
  }, [id]);
  

  const saveUpdateCellStatus = async (data: ICellStatus, text: string) => {
    setLoading(true);
    try {
      const user: ICellStatus | undefined = await
        (id ? CellStatusService.updateCellStatus(id, data, setIsLogin) : CellStatusService.saveCellStatus(data, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        navigate("/stateCell", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateCellStatus = ",  error);
    }
  };

  return (
    <CellStatusForm
      handleSubmit={saveUpdateCellStatus}
      loading={loading}
      dataCellStatus={dataCellStatus}
      edit={id ? true : false}
    />
  );
};