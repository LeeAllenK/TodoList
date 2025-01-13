
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const TrashButton = ({ delClick, children, style }) => {
	return (
		<FontAwesomeIcon
			icon={faTrash}
			style={style}
			onClick={delClick}
		>
			{children}
		</FontAwesomeIcon>
	)
}