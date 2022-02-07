package br.edu.ifrn.ifjobs.dto;

public interface Dto<T, D> {

    public T convertToEntity();

    public D convertToDto(T entity);
}
