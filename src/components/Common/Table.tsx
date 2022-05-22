import { Fragment } from 'react';
import { Table as TableAnt, Button, Row, Col, Tooltip, Popconfirm } from 'antd';
import "../../sass/table.scss";

interface ITable {
  title: string;
  columns: any[];
  dataSource: any[];
  addButtons: any[] | [];
  addActions: any[] | [];
  loading: boolean;
}

export const Table = ({
  title,
  columns,
  dataSource,
  addButtons,
  addActions,
  loading
}: ITable) => {
  const columnsWithMore = [...columns];
  if (addActions && addActions.length > 0) {
    columnsWithMore.push({
      title: 'Acciones',
      key: '',
      align: 'right',
      width: 50 * ((addActions && addActions.length) || 0),
      render: (value: any, record: any) =>
        addActions &&
        addActions.map((action, index) => (
          <Tooltip key={`action-button-${index}-${record.id}`} title={action.text}>
            {' '}
            {action.confirm ? (
              <Popconfirm
                title={action.confirm}
                okText={action.okText || 'Ok'}
                cancelText={action.cancelText || 'Cancel'}
                placement="bottomRight"
                onConfirm={() => action.onClick(record)}
              >
                <Button
                  type={action.type || 'ghost'}
                  shape="circle"
                  icon={action.icon}
                />
              </Popconfirm>
            ) : (
              <Button
                type={action.type || 'ghost'}
                shape="circle"
                icon={action.icon}
                onClick={() => action.onClick(record)}
              />
            )}
          </Tooltip>
        )),
    });
  }

  return (
    <>
      <Row className="row-title">
        <Col>{title}</Col>
        <Col>
          {addButtons &&
            addButtons.map((buttonProps, index) => (
              <Fragment key={`button-section-${index}`}>
                <Button size="large" type="primary" {...buttonProps}>
                  {buttonProps.text}
                </Button>{' '}
              </Fragment>
            ))}
        </Col>
      </Row>
      <TableAnt
        scroll={{ x: true }}
        columns={columnsWithMore}
        dataSource={dataSource}
        className="custom-table"
        loading={loading}
      />
    </>
  );
};