import React from "react";
import { getAllCategories } from "@/app/data/catalog";
import Category from "./Category";

export default function CategoryIndexPage() {
  const categories = getAllCategories();

  return <Category categories={categories} />;
}
