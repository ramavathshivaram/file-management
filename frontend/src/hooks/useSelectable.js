import useSelectStore from "@/store/selectStore";

export function useSelectable(folderId) {
  const add = useSelectStore((s) => s.addSelectedItem);
  const remove = useSelectStore((s) => s.removeSelectedItem);
  const selectedItems = useSelectStore((s) => s.selectedItems);

  const isSelected = selectedItems.includes(folderId);

  const toggleSelect = () => {
    if (isSelected) remove(folderId);
    else add(folderId);
  };
  const isPathChangeble = selectedItems.length === 0;

  return { isSelected, toggleSelect, isPathChangeble };
}
