import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { useBookDispatch } from "../context/AppContext";

function NewBook({}) {
  const dispatch = useBookDispatch();

  return (
    <div>
      <Form dispatch={dispatch} />
    </div>
  );
}

export default NewBook;
