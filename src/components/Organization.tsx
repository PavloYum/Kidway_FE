import { FC, useRef, useState } from "react";
import { IOrganization, OrganizationAction } from "../types";

interface IProps {
  organization: IOrganization;
  index: number;
  handleOrganizationAction: (
    action: OrganizationAction,
    index: number,
    value?: IOrganization | null
  ) => void;
}

const Organization: FC<IProps> = ({ 
  organization,
  index,
  handleOrganizationAction }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  // const latRef = useRef<HTMLInputElement>(null);
  // const longRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const categoryIdRef = useRef<HTMLInputElement>(null);

  return (
    <div className="card">
      <div className="card-body">
        {isEdit ? (
          <>
            <input
              className="form-control"
              ref={nameRef}
              defaultValue={organization.name}
              placeholder="Name"
            />
            <input
              className="form-control"
              ref={descriptionRef}
              defaultValue={organization.description}
              placeholder="Description"
            />
            {/* <input
              className="form-control"
              ref={latRef}
              type="number"
              defaultValue={organization.lat}
              placeholder="Latitude"
            />
            <input
              className="form-control"
              ref={longRef}
              type="number"
              defaultValue={organization.long}
              placeholder="Longitude"
            /> */}
            <input
              className="form-control"
              ref={photoRef}
              defaultValue={organization.photo}
              placeholder="Photo URL"
            />
              <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                handleOrganizationAction("edit", index, {
                  id: organization.id,
                  name: nameRef.current!.value,
                  description: descriptionRef.current!.value,
                  // location: Number(latRef.current!.value),
                  // long: Number(longRef.current!.value),
                  photo: photoRef.current!.value,
                  userId: organization.userId,
                  categoryId: Number(categoryIdRef.current!.value),
                });
                setIsEdit(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="mb-0">Name: {organization.name}</p>
            <p className="mb-0">Description: {organization.description}</p>
            {/* <p className="mb-0">Location: ({organization.lat}, {organization.long})</p> */}
            <p className="mb-0">Category ID: {organization.categoryId}</p>
            <div className="d-flex mt-2">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleOrganizationAction("delete", index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Organization;