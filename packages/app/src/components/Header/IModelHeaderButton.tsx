/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *
 * This code is for demonstration purposes and should not be considered production ready.
 *--------------------------------------------------------------------------------------------*/
import { IModelFull, IModelThumbnail } from "@itwin/imodel-browser-react";
import { HeaderButton } from "@itwin/itwinui-react";
import { useNavigate } from "@reach/router";
import classNames from "classnames";
import React from "react";

import { useApiData } from "../../api/useApiData";
import { useApiPrefix } from "../../api/useApiPrefix";
import "./IModelHeaderButton.scss";

interface IModelHeaderButtonProps {
  accessToken?: string;
  iModelId?: string;
  projectId?: string;
  section?: string;
}
export const IModelHeaderButton = ({
  iModelId,
  section,
  projectId,
  accessToken,
}: IModelHeaderButtonProps) => {
  const navigate = useNavigate();
  const {
    results: { iModel },
  } = useApiData<{ iModel: IModelFull }>({
    accessToken,
    url: `https://api.bentley.com/imodels/${iModelId}`,
  });
  const serverEnvironmentPrefix = useApiPrefix();

 
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  while (!((process.env.IMJS_ITWIN_ID  + process.env.IMJS_VALID_ITWIN_IDS! + "").includes(projectId!))) {
    // allowed
    alert("This application is restricted to use only authorised iTwinId.  Please ensure you select the correct one")
  }
  return (
    <HeaderButton
      key="iModel"
      name={iModel ? iModel?.displayName : "Fetching iModel"}
      description={iModel?.description}
      onClick={() => navigate(`/${section}/project/${projectId}`)}
      className={classNames(!iModel && "iui-skeleton")}
      isActive={!!iModel?.displayName && section !== "view"}
      startIcon={
        !!iModel?.displayName ? (
          <IModelThumbnail
            className={"imodel-header-icon"}
            iModelId={iModelId ?? ""}
            accessToken={accessToken}
            apiOverrides={{ serverEnvironmentPrefix }}
          />
        ) : (
          undefined
        )
      }
    />
  );
};
