import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastProvider";

function ConfirmDelete({
  content,
  id,
  setStateShow,
  onDeleteSuccess,
  api = "",
}: {
  content: string;
  id: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStateShow: any;
  onDeleteSuccess: () => void;
  api: string
}) {
  const { toast } = useContext(ToastContext);

  const handleDelete = () => {
    fetch(`${process.env.API}/${api}/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.state) {
          toast.success(data.notify);
          setStateShow(false);
          onDeleteSuccess?.();
        } else {
          toast.error(data.notify);
        }
      });
  };

  return (
    <div className="">
      <div className="text-[42px] text-gray-600 flex justify-center">
        <FontAwesomeIcon icon={faCircleExclamation} />
      </div>
      <div className="mt-3 mb-3 text-lg text-gray-600">{content}</div>
      <div className="flex justify-center">
        <Button onClick={handleDelete} variant="danger" classNames="mr-2">
          Xóa
        </Button>
        <Button
          onClick={() => {
            setStateShow(false);
          }}
          variant="primary"
        >
          Hủy
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
