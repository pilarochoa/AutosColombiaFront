import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CellForm } from "../../components/Cell/CellForm";
import AppContext from "../../context/AppContext";
import { ICell, IDataSelect } from "../../interfaces/cell";
import { ZoneService } from "../../services/zone";
import { CellStatusService } from "../../services/cellStatus";
import { CellService } from "../../services/cell";
import { IZone } from "../../interfaces/zone";
import { ICellStatus } from "../../interfaces/cellStatus";

export const Cell = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSelects, setDataSelects] = useState<IDataSelect>({
    dataZone: [],
    dataCellStatus: []
  });
  const [dataCell, setDataCell] = useState<ICell | undefined>(undefined);
  const [showError, setShowError] = useState({
    show: false,
    message: ""
  });

  const navigate = useNavigate();

  const getAllRoles = async () => {
    try {
      const zones: IZone[] | undefined = await ZoneService.getAllZones(setIsLogin);
      const cellStatuses: ICellStatus[] | undefined = await CellStatusService.getAllCellStatuses(setIsLogin);
      console.log('zones == ', zones);
      setDataSelects({
        ...dataSelects,
        dataZone: zones || [],
        dataCellStatus: cellStatuses || []
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  const getCellById = async (id: string) => {
    try {
      const user: ICell | undefined = await CellService.getCellById(id, setIsLogin);
      console.log('user == ', user);
      if (user) {
        setDataCell(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('users');
    };
    setLoading(true);
    getAllRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getCellById(id);
    }
  }, [id]);
  

  const saveUpdateCell = async (data: ICell, text: string) => {
    setLoading(true);
    setShowError({
      show: false,
      message: ""
    });
    try {
      const user: ICell | undefined = await
        (id ? CellService.updateCell(id, data, setShowError, setIsLogin) :
        CellService.saveCell(data, setShowError, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        navigate("/cell", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateCell = ",  error);
    }
  };

  return (
    <CellForm
      dataSelects={dataSelects}
      handleSubmit={saveUpdateCell}
      loading={loading}
      dataCell={dataCell}
      edit={id ? true : false}
      showError={showError}
      setShowError={setShowError}
    />
  );
};