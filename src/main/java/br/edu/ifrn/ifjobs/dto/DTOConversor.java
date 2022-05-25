package br.edu.ifrn.ifjobs.dto;

import org.modelmapper.ModelMapper;

public interface DTOConversor {

    public static <E, D> E convertDtoToEntity(D dto, Class<E> entityClass) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(dto, entityClass);
    }

    public static <E, D> D convertEntityToDto(E entity, Class<D> dtoClass) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(entity, dtoClass);
    }

}
