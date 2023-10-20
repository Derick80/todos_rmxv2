import { Checkbox } from "~/components/ui/checkbox";
import React from "react";
import { Label } from "~/components/ui/label";

type CategoryDisplayProps = {
  categories: { id: string; label: string }[];
};

const CategoriesDisplay = ({ categories }: CategoryDisplayProps) => {
  const [checkedCategories, setCheckedCategories] = React.useState<
    { id: string; label: string }[]
  >([]);

  return (
    <div className='flex gap-2 md:gap-5'>
      {categories.map((category) => (
        <>
          <Checkbox
            key={category.id}
            name='cats'
            value={category.label}
            checked={checkedCategories.some((c) => c.id === category.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setCheckedCategories([...checkedCategories, category]);
              } else {
                setCheckedCategories(
                  checkedCategories.filter((c) => c.id !== category.id)
                );
              }
            }}
          />
          <Label htmlFor='cats'>{category.label}</Label>
        </>
      ))}
      <input
        type='hidden'
        name='categories'
        value={checkedCategories.map((item) => item.label)}
      />
    </div>
  );
};

export default CategoriesDisplay;
