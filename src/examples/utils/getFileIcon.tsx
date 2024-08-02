import { IconBrandTypescript, IconJson } from '@tabler/icons-react';

export function getFileIcon(fileName: string) {
	if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
		return <IconBrandTypescript size={18} />;
	}

	// if (fileName.endsWith('.css')) {
	// 	return <IconCss size={18} />;
	// }

	if (fileName.endsWith('.json')) {
		return <IconJson size={18} />;
	}

	return null;
}
