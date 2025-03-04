import * as React from "react";
// import "./example.css";
import { Page } from "@patternfly/react-core";
import { KogitoSpinner } from "@kie-tools/runtime-tools-components/dist/components/KogitoSpinner";

export default function ExamplePage() {
  return (
    <>
      <Page>
        Empty component
        <KogitoSpinner spinnerText="Hello" />
      </Page>
    </>
  );
}
