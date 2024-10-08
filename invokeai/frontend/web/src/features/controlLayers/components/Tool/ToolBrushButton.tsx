import { IconButton } from '@invoke-ai/ui-library';
import { useSelectTool, useToolIsSelected } from 'features/controlLayers/components/Tool/hooks';
import { useImageViewer } from 'features/gallery/components/ImageViewer/useImageViewer';
import { useRegisteredHotkeys } from 'features/system/components/HotkeysModal/useHotkeyData';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PiPaintBrushBold } from 'react-icons/pi';

export const ToolBrushButton = memo(() => {
  const { t } = useTranslation();
  const isSelected = useToolIsSelected('brush');
  const selectBrush = useSelectTool('brush');
  const imageViewer = useImageViewer();

  useRegisteredHotkeys({
    id: 'selectBrushTool',
    category: 'canvas',
    callback: selectBrush,
    options: { enabled: !isSelected && !imageViewer.isOpen },
    dependencies: [isSelected, selectBrush, imageViewer.isOpen],
  });

  return (
    <IconButton
      aria-label={`${t('controlLayers.tool.brush')} (B)`}
      tooltip={`${t('controlLayers.tool.brush')} (B)`}
      icon={<PiPaintBrushBold />}
      colorScheme={isSelected ? 'invokeBlue' : 'base'}
      variant="solid"
      onClick={selectBrush}
    />
  );
});

ToolBrushButton.displayName = 'ToolBrushButton';
