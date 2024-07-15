import { useEffect, useRef, useState } from "react";
import LabelRadioButton from "./LabelRadioButton";
import { categories, defaultRadius } from "@/utils/db";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Location } from "../map/LocationPicker";
import SubmitButton from "./SubmitButton";

type Props = {
  action: (data: FormData) => void;
};

const FilterForm = ({ action }: Props) => {

  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form
      ref={formRef}
      action={action}
      className="flex flex-col  gap-4 grow w-full md:w-1/4  p-4 border-r-2 "
    >
      {/* form  input */}
      <input name="query" type="text" placeholder="Search listing..." />
      <div>
        <LabelRadioButton
          defaultCkecked={true}
          keyName="category"
          icon={faArrowUpRightFromSquare}
          value={"all"}
          onClick={() => formRef.current?.requestSubmit()}
          label={"All categories"}
        />
        {categories.map(({ key: categoryKey, label, icon }, idx) => (
          <LabelRadioButton
            keyName="category"
            icon={icon}
            key={idx}
            value={categoryKey}
            onClick={() => formRef.current?.requestSubmit()}
            label={label}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="text-center md:text-start">
          Filter by price
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input name="min" min={0} type="number" placeholder="Min" />
          <input name="max" min={0} type="number" placeholder="Max" />
        </div>
      </div>
      <SubmitButton
      >
        Search
      </SubmitButton>
      <button
        className="bg-red-500/90 hover:bg-red-500 text-white py-2 rounded transition"
      >
        Reset filters
      </button>
    </form>
  );
};

export default FilterForm;
