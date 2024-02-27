import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from '../ui/button';

const ConfirmCreateFirstCommunityDialog = ({ onConfirm, onSkip }: {
    onConfirm: () => void;
    onSkip: () => void;
}) => {

    return (
        <Dialog open>
            <DialogContent>
                <p>Create your first community?</p>
                <DialogFooter>
                    <Button onClick={onConfirm}>Proceed</Button>
                    <Button onClick={onSkip}>Skip</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { ConfirmCreateFirstCommunityDialog };
