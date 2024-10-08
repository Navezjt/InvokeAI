import 'reactflow/dist/style.css';

import { Flex } from '@invoke-ai/ui-library';
import { useAppSelector } from 'app/store/storeHooks';
import { selectWorkflowMode } from 'features/nodes/store/workflowSlice';
import ResizeHandle from 'features/ui/components/tabs/ResizeHandle';
import WorkflowLibraryButton from 'features/workflowLibrary/components/WorkflowLibraryButton';
import type { CSSProperties } from 'react';
import { memo, useCallback, useRef } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { Panel, PanelGroup } from 'react-resizable-panels';

import InspectorPanel from './inspector/InspectorPanel';
import { WorkflowViewMode } from './viewMode/WorkflowViewMode';
import WorkflowPanel from './workflow/WorkflowPanel';
import { WorkflowMenu } from './WorkflowMenu';
import { WorkflowName } from './WorkflowName';

const panelGroupStyles: CSSProperties = { height: '100%', width: '100%' };

const NodeEditorPanelGroup = () => {
  const mode = useAppSelector(selectWorkflowMode);
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const handleDoubleClickHandle = useCallback(() => {
    if (!panelGroupRef.current) {
      return;
    }
    panelGroupRef.current.setLayout([50, 50]);
  }, []);

  return (
    <Flex w="full" h="full" gap={2} flexDir="column">
      <Flex w="full" justifyContent="space-between" alignItems="center" gap="4" padding={1}>
        <Flex justifyContent="space-between" alignItems="center" gap="4">
          <WorkflowLibraryButton />
          <WorkflowName />
        </Flex>
        <WorkflowMenu />
      </Flex>

      {mode === 'view' && <WorkflowViewMode />}
      {mode === 'edit' && (
        <PanelGroup
          ref={panelGroupRef}
          id="workflow-panel-group"
          autoSaveId="workflow-panel-group"
          direction="vertical"
          style={panelGroupStyles}
        >
          <Panel id="workflow" collapsible minSize={25}>
            <WorkflowPanel />
          </Panel>
          <ResizeHandle orientation="horizontal" onDoubleClick={handleDoubleClickHandle} />
          <Panel id="inspector" collapsible minSize={25}>
            <InspectorPanel />
          </Panel>
        </PanelGroup>
      )}
    </Flex>
  );
};

export default memo(NodeEditorPanelGroup);
