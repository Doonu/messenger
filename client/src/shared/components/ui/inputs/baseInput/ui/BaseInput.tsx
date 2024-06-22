import React, { FC, useEffect, useMemo, useState } from 'react';
import { SIcon, SInput, SLabel, SLoaderSmall, SPrevIcon } from './baseInput.styled';
import { IInput, IVariantType } from '../model/IInput';
import { allVariantType } from '../lib/variantType';

const Input: FC<IInput> = ({
  border,
  type,
  height = 'inherit',
  minWidth = 'inherit',
  sizeLoading = 15,
  loading,
  isBgTransparent,
  prevIcon,
  ...props
}) => {
  const [variantType, setVariantType] = useState<IVariantType>();

  const generateBorderValue = useMemo(() => {
    if (border === 'left') return '0 20px 20px 0';
    if (border === 'right') return '20px 0 0 20px';
    if (border === 'none') return '5px';
    if (border === 'rightNone') return '5px 0 0 5px';
    else return '20px';
  }, [border]);

  const handlePasswordIcon = () => {
    allVariantType.forEach((variant) => {
      if (variant.type !== variantType?.type) {
        setVariantType(variant);
      }
    });
  };

  useEffect(() => {
    if (type === 'password' || type === 'text')
      type === 'password' ? setVariantType(allVariantType[0]) : setVariantType(allVariantType[1]);
  }, []);

  return (
    <SLabel>
      {!!prevIcon && <SPrevIcon>{prevIcon}</SPrevIcon>}
      <SInput
        border={generateBorderValue}
        autoComplete="off"
        type={variantType && variantType.type}
        height={height}
        $minWidth={minWidth}
        $isBgTransparent={isBgTransparent}
        {...props}
      />
      {(variantType?.type === 'password' || variantType?.type === 'text') && !loading && (
        <SIcon onClick={handlePasswordIcon}>{variantType && variantType.icon}</SIcon>
      )}
      {loading && <SLoaderSmall size={sizeLoading} />}
    </SLabel>
  );
};

export default Input;
