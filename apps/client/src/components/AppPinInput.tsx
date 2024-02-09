import { HStack, PinInput, PinInputField } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
    boxSize?: string
    value?: string
    onChange?: (value: string) => void
    onComplete?: (value: string) => void
}

const AppPinInput: FC<Props> = ({
    boxSize = "60px",
    // value,
    // onChange,
    onComplete
}) => {
    return (
        <HStack justifyContent="space-between">
            <PinInput onComplete={onComplete} colorScheme='teal'>
                <PinInputField boxSize={boxSize} />
                <PinInputField boxSize={boxSize} />
                <PinInputField boxSize={boxSize} />
                <PinInputField boxSize={boxSize} />
            </PinInput>
        </HStack >
    )
}

export default AppPinInput